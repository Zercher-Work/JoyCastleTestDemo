const { ccclass, property } = cc._decorator;

@ccclass
export default class PlayBtn extends cc.Component {
    private readonly PRESSED_SCALE = 0.92;
    private readonly ANIM_DURATION = 0.05;

    @property(cc.Button)
    btnPlay: cc.Button = null;

    onLoad() {
        this.btnPlay.node.on(cc.Node.EventType.TOUCH_START, this.onTouchStart, this);
        this.btnPlay.node.on(cc.Node.EventType.TOUCH_END, this.onTouchEnd, this);
        this.btnPlay.node.on(cc.Node.EventType.TOUCH_CANCEL, this.onTouchCancel, this);
    }

    protected onDisable(): void {
        this.node.stopAllActions();
    }

    onTouchStart() {
        this.touchStartAnim();
    }

    onTouchCancel() {
        this.touchEndAnim(true);
    }

    onTouchEnd() {
        this.touchEndAnim();
    }

    touchStartAnim() {
        this.btnPlay.node.color = cc.Color.GRAY;
        cc.tween(this.node)
            .to(this.ANIM_DURATION, { scale: this.PRESSED_SCALE }, { easing: 'sineOut' })
            .to(this.ANIM_DURATION, { scale: 1 }, { easing: 'sineOut' })
            .to(this.ANIM_DURATION, { scale: this.PRESSED_SCALE }, { easing: 'sineOut' })
            .to(this.ANIM_DURATION, { scale: 1 }, { easing: 'sineOut' })
            .to(this.ANIM_DURATION, { scale: this.PRESSED_SCALE }, { easing: 'sineOut' })
            .start();
    }

    touchEndAnim(isCancel: boolean = false) {
        this.btnPlay.node.color = cc.Color.WHITE;
        cc.tween(this.node)
            .to(this.ANIM_DURATION, { scale: 1 }, { easing: 'sineOut' })
            .to(this.ANIM_DURATION, { scale: this.PRESSED_SCALE }, { easing: 'sineOut' })
            .to(this.ANIM_DURATION, { scale: 1 }, { easing: 'sineOut' })
            .to(this.ANIM_DURATION, { scale: this.PRESSED_SCALE }, { easing: 'sineOut' })
            .to(this.ANIM_DURATION, { scale: 1 }, { easing: 'sineOut' })
            .call(() => {
                !isCancel && this.loadGameLevel();
            })
            .start();
    }

    loadGameLevel() {
        console.log('进入游戏');
    }
}
