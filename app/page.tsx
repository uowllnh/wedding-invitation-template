import Section from "./components/Section";
import Button from "./components/Button";
import Line from "./components/Line";
import FamilyInfo from "./components/FamilyInfo";
import HeroSection from "./components/HeroSection";
import WeddingCalendar from "./components/WeddingCalendar";
import WeddingSchedule from "./components/WeddingSchedule";
import Location from "./components/Location";
import Account from "./components/Account";
import ContactButton from "./components/ContactButton";
import RSVP from "./components/RSVP";
import GuestBook from "./components/GuestBook";
import WeddingGallery from "./components/WeddingGallery";
import MenuShell from "./components/MenuShell";

export default function Home() {
  return (
    <MenuShell>
      <HeroSection
        imageSrc="/poster1.png"
        imageAlt="신랑 김민준과 신부 김유라"
        names="Kim Minjun & Kim Yura"
        venue="더링크호텔 3F 그랜드홀"
        dateTime="2026.09.19 11:00 A.M."
      />{" "}
      <div id="greetings" className="scroll-mt-8">
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
              parents: "김아버지 · 김어머니",
              relation: "의 장남",
              name: "김민준",
            }}
            bride={{
              parents: "김아버지 · 김어머니",
              relation: "의 장녀",
              name: "김유라",
            }}
          />
          <ContactButton />
        </Section>
      </div>
      <div id="schedule" className="scroll-mt-8">
        <WeddingCalendar />
        <WeddingSchedule />
      </div>
      <div id="information" className="scroll-mt-8">
        <Section
          entitle="INFORMATION"
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
      </div>
      <div id="rsvp" className="scroll-mt-8">
        <RSVP />
      </div>
      <div id="location" className="scroll-mt-8">
        <Location />
      </div>
      <div id="gallery" className="scroll-mt-8">
        <WeddingGallery />
      </div>
      <div id="guestbook" className="scroll-mt-8">
        <GuestBook />
      </div>
      <div id="account" className="scroll-mt-8">
        <Account />
      </div>
      <Section
        entitle="CAPTURE OUR MOMENTS"
        title="스냅"
        text={
          <>
            저희의 행복한 순간을 담아주세요.
            <br />
            예식 당일, 아래 버튼을 통해
            <br />
            사진을 올려주세요.
            <br />
            많은 참여 부탁드려요!
          </>
        }
      >
        <Button text="사진 업로드" />
        <p className="text-center text-[#606060] text-[10px] mt-4">
          2026-09-19 부터 <br />
          업로드 가능합니다,
        </p>
      </Section>
    </MenuShell>
  );
}
