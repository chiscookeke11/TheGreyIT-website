interface LoadingProps {
    color?: string;
}

export default function Loading({
    color = "border-green-500",
}: LoadingProps) {
    return (
        <div
            className={`size-5 bg-transparent rounded-full border-2 animate-spin border-t-transparent ${color}`}
        />
    );
}