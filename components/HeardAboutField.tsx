"use client";

// "How did you hear about us?" attribution field shared by the poster order
// forms. Referral picks reveal a name/code input used for rep commission
// tracking. The placard inquiry form carries its own dark-themed copy.

export const HEARD_OPTIONS = [
  "Sales rep or distributor",
  "Colleague / word of mouth",
  "LinkedIn",
  "Postcard / mailer",
  "Trade show / event",
  "Web search",
  "Other",
];

export const REFERRAL_OPTIONS = new Set([
  "Sales rep or distributor",
  "Colleague / word of mouth",
]);

type Props = {
  heard: string;
  referrer: string;
  onHeardChange: (value: string) => void;
  onReferrerChange: (value: string) => void;
};

export default function HeardAboutField({ heard, referrer, onHeardChange, onReferrerChange }: Props) {
  const gunmetal = "#1A1F2E";
  return (
    <div>
      <label className="block text-xs font-black uppercase tracking-widest mb-2" style={{ color: gunmetal }}>
        How did you hear about us?
      </label>
      <select
        className="w-full border px-4 py-2.5 text-sm bg-white focus:outline-none"
        style={{ borderColor: "#DDD9D0", color: heard ? gunmetal : "#9B978E" }}
        value={heard}
        onChange={(e) => {
          onHeardChange(e.target.value);
          if (!REFERRAL_OPTIONS.has(e.target.value)) onReferrerChange("");
        }}
      >
        <option value="">Optional — pick one</option>
        {HEARD_OPTIONS.map((o) => (
          <option key={o} value={o}>
            {o}
          </option>
        ))}
      </select>
      {REFERRAL_OPTIONS.has(heard) && (
        <input
          className="mt-2 w-full border px-4 py-2.5 text-sm bg-white focus:outline-none"
          style={{ borderColor: "#DDD9D0", color: gunmetal }}
          placeholder="Who referred you? (rep name or code)"
          value={referrer}
          onChange={(e) => onReferrerChange(e.target.value)}
        />
      )}
    </div>
  );
}
