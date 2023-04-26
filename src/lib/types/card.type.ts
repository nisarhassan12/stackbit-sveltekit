import type { HeadingType, TickListProps } from ".";
import type { ButtonProps } from "./button.type";

export interface CardProps {
	eyebrow?: string;
	heading: string;
	headingType?: HeadingType;
	text?: string;
	html?: string;
	icon?: string;
	button?: ButtonProps;
	variant?: 'default' | 'lined' | 'timeline';
	size?: 'sm' | 'md' | 'lg';
	idx?: number;
	list?: TickListProps;
	images?: { src: string; alt: string; className?: string }[];
	theme?: 'dark' | 'light';
	gradientBorder?: boolean;
}
