type PersonInfo = {
  parents: string;
  relation: string;
  name: string;
};

type FamilyInfoProps = {
  groom: PersonInfo;
  bride: PersonInfo;
};

export default function FamilyInfo({ groom, bride }: FamilyInfoProps) {
  return (
    <div className="space-y-4 text-[13px] text-black">
      {[groom, bride].map(({ parents, relation, name }) => (
        <p key={name}>
          {parents}
          <span className="text-[#919191]">{relation}</span>
          <strong className="ml-2 text-[15px] font-bold">{name}</strong>
        </p>
      ))}
    </div>
  );
}
