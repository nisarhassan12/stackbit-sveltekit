import type { ButtonProps } from "./button.type";

export type DiagramBlockType = 'default' | 'minimal' | 'dbt'

export type LabelListItem = {
	heading: string;
	text: string;
	url?: string;
	icon?: string;
}
export interface FeatureProps {
	heading: string;
	headingLevel?: 'h2' | 'h3';
	eyebrow: string;
	inlineSVG?: any;
	text?: string;
	image?: string;
	alt?: string;
	buttons?: ButtonProps[];
	idx?: number;
	layout?: 'vertical' | 'lined' | '';
	table?: {
		dataset: 'general' | 'cluster_replicas'
	};
	labelList?: LabelListItem[];
	diagramBlock?: {
		variant: DiagramBlockType
	}
}
