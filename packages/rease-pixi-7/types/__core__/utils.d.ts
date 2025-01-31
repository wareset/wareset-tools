import { Rease } from 'rease';
import { IProps } from './types';
export declare function parse_props_before_insert(rease: Rease & {
    pixi: any;
}, { props, $props$, onCreateCapture, onResizeCapture, onRenderCapture, $signalCapture$, }: IProps<any>): void;
export declare function parse_props_after_insert(rease: Rease & {
    pixi: any;
}, { onCreate, onResize, onRender, $signal$ }: IProps<any>): void;
