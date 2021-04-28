# Nuber-Eats Frontend Clone Coding

> 음식배달서비스 클론코딩
>
> 고객과 음식점과 배달원이 상호작용하는 웹 어플리케이션 서비스

Website link: [https://romantic-bohr-f9d4d5.netlify.app/](https://romantic-bohr-f9d4d5.netlify.app/) 

backend project repo: [nuber-eats-backend](https://github.com/dong-woogie/nuber-eats-backend)

## Stack

* React + Typescript
* Grahpql ( Apollo Client )
* TailwindCSS
* jest

## 주요 기능

### Common

* 로그인 / 회원가입
* 이메일 인증
* 반응형 웹디자인
* 웹소켓을 이용한 실시간통신 ( 요청 및 응답 )
* SPA ( Single Page Application )
* 코드스플리팅 ( loadable-components )

### User

* 메인페이지 , 카테고리페이지 , 검색페이지
* 현재 주소 기준으로 배달가능한 음식점 화면에 렌더링
* Pagination - infinite scroll
* 메뉴 장바구니 저장 및 삭제 ( 메뉴, 옵션선택 )
* 메뉴 주문

### Owner

* 음식점 생성하기
* 메뉴 생성하기
* 주문현황 보기
* 실시간 주문 받기

### Driver

* 현재위치 기준 일정범위 안의 배달주문 리스트 받기
* 실시간으로 배달요청하는 매장 UI 추가하기
* 구글맵을 이용해서 현재위치 음식점위치 도착지 위치 화면에 렌더링
* 현재위치 기준 거리 화면에 렌더링