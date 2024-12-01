// Track text selection and editable fields
document.addEventListener('selectionchange', () => {
  const selection = window.getSelection();

  if (selection && selection.rangeCount > 0) {
    const text = selection.toString(); // Include spaces in text count
    const charCount = text.length;

    // Create the display element if it doesn't exist
    let display = document.getElementById('char-count-display');
    if (!display) {
      display = document.createElement('div');
      display.id = 'char-count-display';
      display.style.position = 'fixed'; // Position relative to the viewport
      display.style.background = '#000';
      display.style.color = '#fff';
      display.style.padding = '5px';
      display.style.borderRadius = '5px';
      display.style.zIndex = '10000';
      display.style.display = 'none'; // Initially hidden
      document.body.appendChild(display);
    }

    if (charCount > 0) {
      display.textContent = `Text: ${charCount}`;
      display.style.display = 'block';

      // Update display position on mousemove
      document.addEventListener('mousemove', (e) => {
        display.style.left = `${e.clientX + 10}px`; // Offset slightly to the right
        display.style.top = `${e.clientY + 10}px`; // Offset slightly below
      });
    } else {
      display.style.display = 'none'; // Hide if no valid selection
    }
  }
});

// Track input fields and textareas
document.addEventListener('input', (event) => {
  const target = event.target;

  // Check if the target is an editable field
  if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
    const text = target.value; // Include spaces in text count
    const charCount = text.length;

    // Create the display element if it doesn't exist
    let display = document.getElementById('char-count-display');
    if (!display) {
      display = document.createElement('div');
      display.id = 'char-count-display';
      display.style.position = 'fixed';
      display.style.background = '#000';
      display.style.color = '#fff';
      display.style.padding = '5px';
      display.style.borderRadius = '5px';
      display.style.zIndex = '10000';
      document.body.appendChild(display);
    }

    if (charCount > 0) {
      display.textContent = `Characters (with spaces): ${charCount}`;
      display.style.display = 'block';

      // Position the display near the editable field
      const rect = target.getBoundingClientRect();
      display.style.left = `${rect.right + 10}px`; // Offset slightly to the right
      display.style.top = `${rect.top + window.scrollY}px`; // Align vertically with the field
    } else {
      display.style.display = 'none'; // Hide when no characters
    }
  }
});

// Hide display when focus is lost
document.addEventListener('focusout', (event) => {
  const target = event.target;
  if (target && (target.tagName === 'INPUT' || target.tagName === 'TEXTAREA')) {
    const display = document.getElementById('char-count-display');
    if (display) {
      display.style.display = 'none';
    }
  }
});