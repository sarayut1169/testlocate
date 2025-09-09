function sendLocation() {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(function(position) {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;

      console.log("ละติจูด:", latitude);
      console.log("ลองจิจูด:", longitude);

      // ✅ ส่งไปยัง API ที่ต้องการ
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
