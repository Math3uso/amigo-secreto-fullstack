export function converteDate(date: string) {
    const dateConvert = new Date(date);
    const formatted = dateConvert.toLocaleDateString('pt-BR');
    return formatted;
}