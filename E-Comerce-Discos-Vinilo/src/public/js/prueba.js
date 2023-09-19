document.addEventListener('DOMContentLoaded', function() {
    const productDescriptions = document.querySelectorAll('.product-description');
  
    // Agregar un evento de doble clic a cada descripción de producto
    productDescriptions.forEach(function(description) {
      description.addEventListener('dblclick', function() {
        // Habilitar la edición del texto en un campo de entrada
        const originalText = description.textContent;
        const inputElement = document.createElement('input');
        inputElement.type = 'text';
        inputElement.value = originalText;
  
        // Reemplazar la descripción con el campo de entrada
        description.textContent = '';
        description.appendChild(inputElement);
  
        // Enfocar el campo de entrada y seleccionar su contenido
        inputElement.focus();
        inputElement.select();
  
        // Escuchar el evento de pérdida de enfoque en el campo de entrada
        inputElement.addEventListener('blur', function() {
          // Guardar los cambios en el servidor WebSocket aquí
          const newDescription = inputElement.value;
          
          // Actualizar la descripción en la vista
          description.textContent = newDescription;
  
          // Aquí debes enviar los cambios al servidor WebSocket para guardarlos de manera permanente
          // y notificar a otros clientes sobre la actualización.
        });
      });
    });
  });