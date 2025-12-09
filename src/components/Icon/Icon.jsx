const Icon = ({ name, size = 24, className }) => (
  <svg width={size} height={size} className={className}>
    <use href={`/icons.svg#${name}`} />
  </svg>
);

export default Icon;
