export default function (): {
    name: string;
    transform(code: string, id: string): {
        code: string;
    };
};
