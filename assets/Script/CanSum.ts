const { ccclass, property } = cc._decorator;

@ccclass
export default class CanSum extends cc.Component {
    @property(cc.Label)
    labDesc: cc.Label = null;

    private canSumFunc(a: number[], b: number[], v: number): boolean {
        const [shorterArray, longerArray] = a.length <= b.length ? [a, b] : [b, a];
        const longerSet = new Set(longerArray);

        for (const num of shorterArray) {
            const requiredNum = v - num;
            if (longerSet.has(requiredNum)) {
                return true;
            }
        }

        return false;
    }

    protected onEnable(): void {
        this.showLog();
    }

    protected onDisable(): void {
        this.labDesc.string = '';
    }

    private showLog() {
        const a = [10, 40, 5, 280];
        const b = [234, 5, 2, 148, 23];
        const v = 42;
        const desc = `时间复杂度分析\n
        1. 选择较短的数组作为遍历对象：\n
        假设较短的数组长度为 'k'，较长的数组长度为 'l'。\n
        将较长的数组转换为 Set 的时间复杂度为 'O(l)'。\n
        2. 遍历较短的数组并查找 Set：\n
        遍历较短数组的时间复杂度为 'O(k)'。\n
        每次查找 Set 的时间复杂度为 'O(1)'。\n\n
        总时间复杂度为 'O(k + l)'，其中 'k' 是较短数组的长度，'l' 是较长数组的长度。`;

        this.labDesc.string = `const a = [${a}]\nconst b = [${b}]\nconst v = ${v}\n调用函数canSumFunc并输出结果: ${this.canSumFunc(
            a,
            b,
            v
        )}\n\n${desc}`;
    }
}
