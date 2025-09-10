function sendLocation() {
  const messageElement = document.getElementById("message");

  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      fetch('http://localhost:5047/api/locate/get', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Accept': '*/*'
        },
        body: JSON.stringify({
          latitude: latitude,
          longitude: longitude
        })
      })
      .then(response => response.json())
      .then(data => {
        messageElement.textContent = `✅ ส่งตำแหน่งเรียบร้อยแล้ว: ${JSON.stringify(data.message)}`;
      })
      .catch(error => {
        messageElement.textContent = `❌ เกิดข้อผิดพลาด: ${error.message}`;
      });

    }, function(error) {
      messageElement.textContent = `⚠️ ไม่สามารถเข้าถึงตำแหน่งได้: ${error.message}`;
    });
  } else {
    messageElement.textContent = "🚫 เบราว์เซอร์ไม่รองรับ Geolocation";
  }
}