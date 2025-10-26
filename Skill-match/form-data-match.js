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

document.querySelector("form").addEventListener("submit", async (e) => {
  e.preventDefault();

  const loader = document.getElementById("loader-overlay");
  loader.style.display = "flex"; // Affiche le loader

  const formData = {
    fullName: document.getElementById("fullName").value,
    institution: document.getElementById("institution").value,
    age: document.getElementById("age").value,
    nationality: document.getElementById("nationality").value,
    focusArea: document.getElementById("focusArea").value,
    internshipStart: document.getElementById("internshipStart").value,
    internshipEnd: document.getElementById("internshipEnd").value,
    studyLevel: document.getElementById("studyLevel").value,
    email: document.getElementById("email").value,
    whatsapp: document.getElementById("whatsapp").value,
    additionalNotes: document.getElementById("additionalNotes").value
  };

  const url = "https://script.google.com/macros/s/AKfycbz7WT_Q_igw83PJ-6AwemNkhMj8i-Gkj2F9xvKPxR0pT8gOCSNPoKtfXJB-tHGdTJEv/exec";

  try {
    // Bloque le formulaire
    e.target.querySelectorAll("input, textarea, button, select").forEach(el => el.disabled = true);

    await fetch(url, {
      method: "POST",
      mode: "no-cors",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(formData)
    });

    // Cache loader avant de montrer modal
    loader.style.display = "none";
    showModal("✅ Application submitted successfully!");
    e.target.reset();

  } catch (error) {
    loader.style.display = "none";
    console.error("❌ Error submitting form:", error);
    showModal("⚠️ Failed to send application. Please try again.");

  } finally {
    e.target.querySelectorAll("input, textarea, button, select").forEach(el => el.disabled = false);
  }
});
