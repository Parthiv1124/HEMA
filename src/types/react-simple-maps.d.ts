declare module 'react-simple-maps' {
    import { ReactNode, SVGProps, MouseEvent } from 'react'

    export interface ComposableMapProps {
        projection?: string
        projectionConfig?: Record<string, unknown>
        style?: React.CSSProperties
        className?: string
        children?: ReactNode
    }

    export interface GeographiesProps {
        geography: string | Record<string, unknown>
        children: (args: { geographies: Geography[] }) => ReactNode
    }

    export interface Geography {
        rsmKey: string
        [key: string]: unknown
    }

    export interface GeographyProps extends SVGProps<SVGPathElement> {
        geography: Geography
        style?: {
            default?: React.CSSProperties
            hover?: React.CSSProperties
            pressed?: React.CSSProperties
        }
    }

    export interface MarkerProps {
        coordinates: [number, number]
        children?: ReactNode
        onMouseEnter?: (event: MouseEvent<SVGGElement>) => void
        onMouseLeave?: (event: MouseEvent<SVGGElement>) => void
    }

    export function ComposableMap(props: ComposableMapProps): JSX.Element
    export function Geographies(props: GeographiesProps): JSX.Element
    export function Geography(props: GeographyProps): JSX.Element
    export function Marker(props: MarkerProps): JSX.Element
}
