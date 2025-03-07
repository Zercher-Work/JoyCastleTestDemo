const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayBtnAnimation extends cc.Component {
    @property(cc.Animation)
    btnAnimation: cc.Animation = null;

    protected onEnable(): void {
        this.btnAnimation.play('PlayBtnShow');
    }

    protected onDisable(): void {
        this.btnAnimation.stop();
    }

    onShowAnimationFinish() {
        this.btnAnimation.play('PlayBtn');
    }
}
