interface Props {
  value: any;
  onChange: (updated: any) => void;
}

export default function ReviewChecklist({ value, onChange }: Props) {
  const checklistItems = [
    { key: "legalDocumentMatch", label: "Legal Document Match (NIB / NPWP / Akta)" },
    { key: "addressVerified", label: "Installation Address Verified" },
    { key: "serviceEligibility", label: "Service Eligibility (Coverage / Satellite Visibility)" },
    { key: "deviceAvailability", label: "Device Availability Confirmed" },
    { key: "slaReviewed", label: "SLA / Terms Reviewed" },
    { key: "contractTermReviewed", label: "Contract Term Validated" },
  ];

  const toggleItem = (key: string) => {
    onChange({ ...value, [key]: !value[key] });
  };

  return (
    <div className="space-y-2">
      {checklistItems.map((item) => (
        <label key={item.key} className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={value[item.key] || false}
            onChange={() => toggleItem(item.key)}
          />
          {item.label}
        </label>
      ))}
    </div>
  );
}
