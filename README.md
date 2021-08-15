## Synopsis

---

WebRTC 통신을 위한 React 페이지입니다. 해당 realtime-client가 실행되기위해서는 realtime-server가 작동해야합니다.

보다 원활한 접속을 위해 **Manager Server**을 통해 접속하시기 바랍니다.

Manager server URL:: ["**https://118.67.131.138:30000"**](https://118.67.131.138:30000/)

Realtime Client URL:: ["**https://118.67.131.138:30020/"**](https://118.67.131.138:30020/)

## Quick Start

```bash
git clone https://github.com/openInfra-project/AutoWatch-Realtime-Client
cd client
npm install
npm start
```

 * npm 환경에서 돌아가는 서비스 입니다. 실행 전 npm이 설치되어 있는지 확인해야 합니다.
## 🎨 Preview
https://user-images.githubusercontent.com/48875061/129474018-dce9fa5a-57ed-4b63-a775-8145f33aaae7.mp4
 
## 📽️WebRTC
![Web App Reference Architecture (1)](https://user-images.githubusercontent.com/48875061/129440265-23c41b6a-547a-44dd-8a7e-81a245d129fa.png)


### **💻 Development Stack**

- React
- React Router
- Sass
- Redux
- socket.io
- WebRTC
- GazeCloudAPI


### 🖋Features

- **EXAM모드**
    1. EXAM모드에 따른 실시간 시선처리 및 자리이탈 감지
    2. 실시간 감지 Data를 방장에게 실시간 알림 기능
- **STUDY모드**
    1. STUDY모드에 따른 Gaze 비활성화
    2. socket.io를 활용한 실시간 채팅 기능

### 🐹API

RealTime-Client

/component

- ChatTemplate
    - 실시간 채팅을 통신 연결
    - 채팅 on/off 슬라이드 기능
- ErrorTemplate
    - 에러 Catch를 위한 페이지
    - 새로고침/Userdata불일치 등
- GroupTemplate
    - 관리자 페이지(방장만 열람 가능)
    - 각종 부정행위 기록
    - 관리자 페이지 on/off 슬라이드 기능
- RenderTemPlate
    - Django서버로 Data를 받아 해당하는 Room으로 입장하는 페이지
    - 해당 방이 없으면 방을 생성
- SectionTemplate
    - 화상통화 연결 페이지
    - 실시간 시선 처리 감시
    - 실시간 자리 이탈 감시
    - 부정행위 시 해당 정보를 감독관에게 실시간 전달
- VideoTemplate
    - 자신을 제외한 연결 요청을 받은 사용자 연결
- Home
    - 관리자, 채팅 슬라이드 포함
    - (마이크,비디오) on/off 상태관리
    - 부정행위 시 감독관에게 실시간 custom alert 기능

redux

- 각종 상태관리
### 🙋‍♂️Role
 @김준영 

 - *전체 Layout 구축*
 - *WebSocket token을 활용한 peer connection*
 - *Chat 기능 구축*
 - *부정행위 실시간 알람기능 구축*
 - *백엔드 실시간 통신 구축*
 - *Redux를 활용한 SettingData(Gaze,마이크,비디오 on/off) 및 UserData 상태 관리*

 @김혜원 

 - *오픈소스 GazeCouldAPI 연동*
### License
```
MIT License

Copyright (혜몽유식) [2021-08-15] [JunYoung Kim]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
```
