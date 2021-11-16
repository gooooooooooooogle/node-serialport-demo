const { getComList, openCom, closeCom, sendAndReceive } = require('./serialPort')

main()

async function main() {
  console.log('---------start---------')

  try {
    // 1.获取串口列表
    const comList = await getComList()
    console.log(comList);

    // 2.打开串口
    const openOptions = {
      autoOpen: false,
      baudRate: 9600,
      parity: 'even'
    }
    const port = openCom('COM4', openOptions);

    const sendStr = 'FEFEFEFE68AAAAAAAAAAAA681300DF16';
    // 3.发送、接收数据
    for (let index = 1; index <= 20; index++) {
      console.log(`发送${index}：` + sendStr);
      let receiveData = await sendAndReceive(port, sendStr)
      console.log(`返回${index}：` + receiveData);
    }

    // 4.关闭串口
    closeCom(port);
  } catch (error) {
    console.log(error);
  }
  console.log('---------end---------')
}



