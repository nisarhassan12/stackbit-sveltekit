export interface ButtonProps {
	type?: 'a' | 'button';
	url?: string;
	label: JSX.Element | JSX.Element[] | string;
	variant?: 'cta' | 'ghost' | 'text';
	size?: 'sm' | 'md';
	download?: boolean;
	class?: string;
	onClick?: () => void;
}
