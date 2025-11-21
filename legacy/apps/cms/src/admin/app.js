// Strapi Admin customization: small DOM fix to ensure every label[for]
// references a real control id on Content Manager edit views.
export default {
  register() {},
  bootstrap() {
    const fixLabels = () => {
      try {
        document.querySelectorAll('label[for]')?.forEach((label) => {
          const id = label.getAttribute('for');
          if (!id) return;
          if (document.getElementById(id)) return;
          // Try to find a control near this label
          let root = label.parentElement;
          // climb one level if needed (Strapi wraps label in a div)
          if (root && root.nextElementSibling) root = root.parentElement || root;
          const candidates = root?.querySelector?.(
            'input, select, textarea, [role="combobox"], [data-strapi-field] input, [data-strapi-field] select'
          );
          const control = candidates || label.nextElementSibling;
          if (control) {
            // assign id to the actual input/select if missing
            if (!control.id) control.id = id;
            // keep label in sync with discovered control id
            label.setAttribute('for', control.id);
          }
        });
      } catch (e) {}
    };

    // Fix on load and observe DOM changes (navigate between entries)
    window.addEventListener('load', fixLabels);
    const mo = new MutationObserver(fixLabels);
    mo.observe(document.body, { childList: true, subtree: true });
    // initial pass
    fixLabels();
  },
};

