function sendLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      // 👇 แสดงตำแหน่งบนหน้าเว็บ
      const locationDiv = document.getElementById("locationDisplay");
      locationDiv.innerHTML = `ละติจูด: ${latitude.toFixed(6)}<br>ลองจิจูด: ${longitude.toFixed(6)}`;

      // ✅ ส่งไปยัง API ที่ต้องการ
      fetch('https://a595f27940a4.ngrok-free.app/api/locate/get', {
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
        alert('ส่งตำแหน่งเรียบร้อยแล้ว');
        console.log('Response:', data);
      })
      .catch(error => {
        console.error('เกิดข้อผิดพลาด:', error);
      });

    }, function(error) {
      alert("ไม่สามารถเข้าถึงตำแหน่งได้: " + error.message);
    });
  } else {
    alert("เบราว์เซอร์ไม่รองรับ Geolocation");
  }
}
