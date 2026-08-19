import { statusToSealClass } from "../../utils/format";

export default function SealBadge({ status }) {
  return (
    <span className={`seal ${statusToSealClass(status)}`}>
      <span className="seal-dot" />
      {status}
    </span>
  );
}
