export async function sendGetdRequest({ endpoint, method, headers, data }) {
  const response = await fetch(endpoint, {
    method: method, // *GET, POST, PUT, DELETE 등
    headers: headers,
    body: JSON.stringify(data), // body의 데이터 유형은 반드시 "Content-Type" 헤더와 일치해야 함
  });
  return response.json(); // JSON 응답을 네이티브 JavaScript 객체로 파싱
}
