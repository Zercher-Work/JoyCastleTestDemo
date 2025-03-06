const { ccclass, property } = cc._decorator;

@ccclass
export default class Helloworld extends cc.Component {
    @property([cc.Node])
    contentGroup: cc.Node[] = [];

    onBtnQuestionClicked(target: cc.Button, customData: string) {
        for (let index = 0; index < this.contentGroup.length; index++) {
            const content = this.contentGroup[index];
            content.active = customData === (index + 1).toString();
        }
    }
}
