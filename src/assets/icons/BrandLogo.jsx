import mantaLogo from '../images/manta-logo.png';

export function BrandLogo({ size = 'md' }) {
  const sizes = {
    sm: 'h-6 w-auto',
    md: 'h-8 w-auto',
    lg: 'h-11 w-auto',
  };

  const sizeClass = sizes[size] || sizes.md;

  return (
    <img
      src={mantaLogo}
      alt="Manta Logo"
      className={`${sizeClass} object-contain select-none`}
    />
  );
}
