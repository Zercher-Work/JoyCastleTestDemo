const { ccclass, property } = cc._decorator;

@ccclass
export default class RandomMatrix extends cc.Component {
    @property(cc.EditBox)
    editX: cc.EditBox = null;

    @property(cc.EditBox)
    editY: cc.EditBox = null;

    @property(cc.Node)
    matrixContent: cc.Node = null;

    @property(cc.SpriteFrame)
    defaultSpriteFrame: cc.SpriteFrame = null;

    private readonly ColorGroup: cc.Color[] = [cc.Color.RED, cc.Color.GREEN, cc.Color.BLUE, cc.Color.YELLOW, cc.Color.ORANGE];
    private readonly ArrayMaxRows = 10;
    private readonly ArrayMaxCols = 10;

    protected onEnable(): void {
        console.log('RandomMatrix-onEnable');
    }

    protected onDisable(): void {
        console.log('RandomMatrix-onDisable');

        this.editX.string = '';
        this.editY.string = '';
        this.matrixContent.removeAllChildren();
    }

    createRandomMatrix() {
        const X = parseFloat(this.editX.string) || 0;
        const Y = parseFloat(this.editY.string) || 0;
        const matrix = this.createMatrixArray(X, Y);
        this.showMatrix(matrix);
    }

    private createMatrixArray(X: number, Y: number): number[][] {
        const matrix: number[][] = [];
        for (let m = 0; m < this.ArrayMaxRows; m++) {
            matrix[m] = [];
            for (let n = 0; n < this.ArrayMaxCols; n++) {
                if (m === 0 && n === 0) {
                    matrix[m][n] = Math.floor(Math.random() * this.ColorGroup.length);
                } else {
                    matrix[m][n] = this.randomColor(m, n, matrix, X, Y);
                }
            }
        }
        return matrix;
    }

    private randomColor(m: number, n: number, matrix: number[][], X: number, Y: number): number {
        const left = n > 0 ? matrix[m][n - 1] : null;
        const top = m > 0 ? matrix[m - 1][n] : null;
        const weights = [];
        this.ColorGroup.forEach(() => {
            weights.push(1);
        });
        console.log('RandomMatrix-randomColor-weights-create:', weights);

        if (left !== null && top !== null) {
            if (left === top) {
                weights[left] += Y / 100;
            } else {
                weights[left] += X / 100;
                weights[top] += X / 100;
            }
        } else {
            if (left !== null) weights[left] += X / 100;
            if (top !== null) weights[top] += X / 100;
        }
        console.log('RandomMatrix-randomColor-weights-random:', weights);

        const sum = weights.reduce((a, b) => a + b, 0);
        const rand = Math.random() * sum;
        let accum = 0;
        for (let i = 0; i < this.ColorGroup.length; i++) {
            accum += weights[i];
            if (rand < accum) return i;
        }
        return 0;
    }

    private showMatrix(matrixGroup: number[][]) {
        this.matrixContent.removeAllChildren();

        const layout = this.matrixContent.getComponent(cc.Layout);
        for (let m = 0; m < matrixGroup.length; m++) {
            for (let n = 0; n < matrixGroup[m].length; n++) {
                const node = new cc.Node();
                const sprite = node.addComponent(cc.Sprite);
                sprite.spriteFrame = this.defaultSpriteFrame;
                sprite.node.color = this.ColorGroup[matrixGroup[m][n]];
                node.setContentSize(layout?.cellSize.width || 50, layout?.cellSize.height || 50);
                this.matrixContent.addChild(node);
            }
        }

        layout.updateLayout();
    }
}
