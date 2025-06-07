export const GroupCreateError = ({ error }: { error: string }) => {
    return (
        <div className="text-start">
            <span className="text-sm text-red-400">
                {error}
            </span>
        </div>
    );
}