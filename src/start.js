export const getRecommend = async () => {
  const spawn = require('child_process').spawn;
  // 2. spawn을 통해 "python 파이썬파일.py" 명령어 실행
  const result = spawn('python', ['start.py']);
  // 3. stdout의 'data'이벤트리스너로 실행결과를 받는다.
  const data = result.stdout.on('data', async function (data) {
    const favorites = await JSON.parse(data.toString());
    console.log(favorites)
    return favorites;
  });
  console.log(data);
  // 4. 에러 발생 시, stderr의 'data'이벤트리스너로 실행결과를 받는다.
  result.stderr.on('data', function (data) { console.log(data.toString()); });
  return data;
};