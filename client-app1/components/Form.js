const handleSubmit = (e) => {
  e.preventDefault();
  socket.emit('submitForm');
}

// Add to your form element
<form onSubmit={handleSubmit}>
  {/* Your form fields */}
  <button type="submit">Submit</button>
</form>
