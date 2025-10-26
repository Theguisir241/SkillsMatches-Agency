document.addEventListener("DOMContentLoaded", function() {
  const form = document.querySelector('.enrollment-form');
  if (!form) {
    console.error("❌ Form not found in DOM. Check your class name or script placement.");
    return;
  }

  console.log("✅ Form listener attached.");

  const loader = document.getElementById("loader-overlay");
  const modal = document.getElementById("modal");
  const modalMessage = document.getElementById("modal-message");
  const modalClose = document.getElementById("modal-close");

  function showModal(message) {
    modalMessage.textContent = message;
    modal.classList.add("show");
  }

  modalClose.addEventListener("click", () => {
    modal.classList.remove("show");
  });

  form.addEventListener('submit', async function(e) {
    e.preventDefault();
    console.log("✅ Form submitted, preparing data...");

    const data = {
      firstName: form.firstName.value,
      lastName: form.lastName.value,
      nationality: form.nationality.value,
      email: form.email.value,
      whatsapp: form.whatsapp.value,
      program: form.program.value,
      startDate: form.startDate.value,
      message: form.message.value
    };

    console.log("📤 Data to send:", data);

    try {
      // Bloque le formulaire
      form.querySelectorAll("input, textarea, button, select").forEach(el => el.disabled = true);
      loader.style.display = "flex"; // Affiche le loader

      await fetch("https://script.google.com/macros/s/AKfycbxOs7ymg1g6OTRf-6DxsfH--uPB7k9-M094Yd7uSHUuVF9_e3zQUwXfOlKJGoW9lW6r/exec", {
        method: "POST",
        mode: "no-cors",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      loader.style.display = "none"; // Cache le loader avant modal
      showModal("✅ Your enrollment has been submitted successfully!");
      form.reset();

    } catch (error) {
      loader.style.display = "none";
      console.error("❌ Error during submission:", error);
      showModal("❌ Submission failed. Try with a better internet connection.");

    } finally {
      form.querySelectorAll("input, textarea, button, select").forEach(el => el.disabled = false);
    }
  });
});
