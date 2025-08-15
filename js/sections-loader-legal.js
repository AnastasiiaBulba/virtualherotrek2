// Sections Loader for Legal Pages (Privacy, Cookies, Disclaimer)
document.addEventListener("DOMContentLoaded", function () {
  console.log("Legal page sections loader initialized");

  // For legal pages, we don't need to load additional sections
  // Just dispatch the event to indicate the page is ready
  document.dispatchEvent(new Event("sectionsLoaded"));
});
