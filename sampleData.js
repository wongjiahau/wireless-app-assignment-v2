export const sampleData = () => `
Ironman2|English|584841600
Transformer|English|1183420800
It's a Mad, Mad, Mad World|Cantonese|538704000
Chicken talk|Chinese|638704000
Ketam Holi|Malay|738704000
`.trim().split("\n").map((x, index) => {
    const fields = x.split("|");
    return {
        id: index,
        title: fields[0],
        language: fields[1],
        release_date: parseInt(fields[2])
    }
});
