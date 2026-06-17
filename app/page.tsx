import Section from "./components/Section";
import Button from "./components/Button";
import { Pencil, Phone, Smile } from "lucide-react";
import Line from "./components/Line";
import FamilyInfo from "./components/FamilyInfo";
import HeroSection from "./components/HeroSection";
import WeddingCalendar from "./components/WeddingCalendar";
import WeddingSchedule from "./components/WeddingSchedule";
import Location from "./components/Location";
import Account from "./components/Account";

export default function Home() {
  return (
    <div className="h-dvh overflow-hidden bg-white">
      <main className="mx-auto h-dvh w-full max-w-107.5 overflow-x-hidden overflow-y-auto scroll-smooth bg-[#F3F2ED] shadow-xl">
        <HeroSection
          imageSrc="/poster1.png"
          imageAlt="신랑 김민준과 신부 김유라"
          names="Kim Minjun & Kim Yura"
          venue="더링크호텔 3F 그랜드홀"
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
        <Section
          entitle="GUESTBOOK"
          title="방명록"
          text={
            <>
              신랑, 신부의
              <br />
              결혼을 축하해주세요.
            </>
          }
        >
          <Button icon={<Pencil />} text="방명록 작성하기" />
        </Section>
        <Account />
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
      </main>
    </div>
  );
}
