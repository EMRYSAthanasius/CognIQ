const fs = require('fs');
const path = require('path');

const CATEGORIES = ["LA", "MA", "PS", "VR", "WM", "SP", "SR"];
const TOTAL_QUESTIONS = 5000;

function generateMockPool() {
    const pool = [];
    const questionsPerCategory = Math.ceil(TOTAL_QUESTIONS / CATEGORIES.length);

    let idCounter = 1;

    for (const cat of CATEGORIES) {
        for (let i = 0; i < questionsPerCategory; i++) {
            if (pool.length >= TOTAL_QUESTIONS) break;

            const difficulty = Math.floor(Math.random() * 10) + 1;
            const isVisual = cat === "LA" || cat === "SR";
            const timerOverride = cat === "SP" ? 20 : 60;

            const question = {
                id: idCounter++,
                category: cat,
                difficulty: difficulty,
                timerOverride: timerOverride,
                q: `Mock question for ${cat} (Difficulty ${difficulty}) - ID ${idCounter-1}`,
                o: ["Option A", "Option B", "Option C", "Option D"],
                a: Math.floor(Math.random() * 4)
            };

            if (isVisual) {
                if (Math.random() > 0.5) {
                    question.diagramData = {
                        type: "svg",
                        svgKey: "arrow_up" // reusing existing mock svg
                    };
                } else {
                    question.diagramData = {
                        type: "matrix",
                        m: [["A", "B"], ["C", "?"]]
                    };
                }
            } else if (cat === "WM") {
                question.diagramData = {
                    type: "memory",
                    memseq: "9 - 4 - 1 - X"
                };
            }

            pool.push(question);
        }
    }

    const fileContent = `export const MOCK_POOL = ${JSON.stringify(pool, null, 2)};\n`;
    fs.writeFileSync(path.join(__dirname, 'src', 'data', 'mockPool.ts'), fileContent);
    console.log(`Generated ${pool.length} questions in src/data/mockPool.ts`);
}

generateMockPool();
