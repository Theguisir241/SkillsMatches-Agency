document.addEventListener("DOMContentLoaded", function() {
  // Sélecteur du formulaire
  const form = document.querySelector('.enrollment-form');

  if (!form) {
    console.error("❌ Form not found in DOM. Check your class name or script placement.");
    return;
  }

  console.log("✅ Form listener attached.");

  form.addEventListener('submit', async function(e) {
    e.preventDefault(); // empêche le rechargement de la page
    console.log("✅ Form submitted, preparing data...");

    // Récupération des valeurs du formulaire
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
      // Envoi des données vers le Google Script
      await fetch("https://script.google.com/macros/s/AKfycbyABX6aWb-NXSa0LssRH_8twAZdI-kxxmG5Bp3xZTXAYQ8ZkLeSHYrmOZanaL9B02KIpg/exec", {
        method: "POST",
        mode: "no-cors", // Google Apps Script accepte no-cors
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data)
      });

      console.log("✅ Data sent successfully.");
      alert("✅ Your enrollment has been submitted successfully!");
      form.reset();

    } catch (error) {
      console.error("❌ Error during submission:", error);
      alert("❌ Submission failed. Try with a better internet connexion.");
    }
  });
});
