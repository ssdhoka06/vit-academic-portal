import { motion } from "framer-motion";

export default function ProgressBar({ value, showLabel = true }) {
  return (
    <div>
      <div className="progress-track">
        <motion.div
          className="progress-fill"
          initial={{ width: 0 }}
          animate={{ width: `${value}%` }}
          transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
        />
      </div>
      {showLabel && (
        <div className="mono" style={{ fontSize: 11, color: "var(--muted-2)", marginTop: 5 }}>
          {value}% complete
        </div>
      )}
    </div>
  );
}
