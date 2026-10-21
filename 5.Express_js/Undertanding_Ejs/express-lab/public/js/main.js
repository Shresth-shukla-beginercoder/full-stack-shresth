// Find every element with the "copy" class and run the callback for each one.
document.querySelectorAll('.copy').forEach(b => b.onclick = () => {
  // Copy the text inside the nearest .code block's <code> element to the clipboard.
  navigator.clipboard.writeText(b.closest('.code').querySelector('code').innerText);
  // Show feedback on the button, then change it back to "Copy" after 1.2 seconds.
  b.textContent = 'Copied ✓'; setTimeout(() => b.textContent = 'Copy', 1200);
// Close the click-handler function and the forEach call.
});
