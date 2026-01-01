const Icon = ({ name, size = 24, className }) => (
  <svg width={size} height={size} className={className} fill="currentColor">
    <use href={`icons.svg#${name}`} xlinkHref={`icons.svg#${name}`} />
  </svg>
);

export default Icon;
