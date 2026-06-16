import Section from "./components/Section";
import Button from "./components/Button";
import { Phone, Smile } from "lucide-react";
import Line from "./components/Line";
import FamilyInfo from "./components/FamilyInfo";
import HeroSection from "./components/HeroSection";
import WeddingCalendar from "./components/WeddingCalendar";
import WeddingSchedule from "./components/WeddingSchedule";
import Location from "./components/Location";

export default function Home() {
  return (
    <div className="h-dvh overflow-hidden bg-white">
      <main className="mx-auto h-dvh w-full max-w-107.5 overflow-x-hidden overflow-y-auto scroll-smooth bg-[#F3F2ED] shadow-xl">
        <HeroSection
          imageSrc="/main.png"
          imageAlt="신랑 김건호와 신부 김유리"
          names="Kim Geonho & Kim Yuri"
          venue="L7 광명 바이 롯데호텔 3F 스튜디오"
          dateTime="2026.09.19 11:00 A.M."
        />
        <Section
          entitle="INVITATION"
          title="소중한 분들을 초대합니다"
          text={
            <>
              서로에게 가장 따뜻한 사람이 되어
              <br />
              같은 방향을 바라보며 함께 걸어가려 합니다.
              <br />
              <br />
              저희 두 사람이 부부로 시작하는 날,
              <br />
              귀한 걸음으로 함께해 주시면
              <br />큰 기쁨으로 간직하겠습니다.
            </>
          }
        >
          <Line className="w-21.75 my-12.5" />
          <FamilyInfo
            groom={{
              parents: "김영환 · 박명순",
              relation: "의 장남",
              name: "김건호",
            }}
            bride={{
              parents: "김성연 · 이정희",
              relation: "의 장녀",
              name: "김유리",
            }}
          />
          <Button icon={<Phone />} text="연락하기" />
        </Section>
        <WeddingCalendar />
        <WeddingSchedule />
        <Section
          entitle="IMFORMATION"
          title="안내사항"
          smtext={
            <>
              뷔페는 오전 10시 30분부터 오후 12시 30분까지 이용 가능합니다.
              <br />
              웨딩홀 운영 지침상 이용 가능 시간이 정해져 있으니,
              <br />
              하객 여러분께서는 식사 시간 참고 부탁드립니다.
            </>
          }
        />
        <Section
          entitle="R.S.V.P"
          title="참석 의사 전달"
          smtext={
            <>
              신랑, 신부에게 참석의사를
              <br />
              미리 전달할 수 있어요.
            </>
          }
        >
          <Button icon={<Smile />} text="참석의사 전달하기" />
        </Section>
        <Location />
        <Section entitle="GALLERY" title="웨딩 갤러리" />
        <Section entitle="GUESTBOOK" title="방명록" />
      </main>
    </div>
  );
}
