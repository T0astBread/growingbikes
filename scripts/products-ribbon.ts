/**
 * Created by Michael on 06.06.2017.
 */

{
    let mouseDown: boolean, lastMouseDown: number, lastMouseDownPageX: number;

    let offsetInElem = (target: HTMLElement, evt: MouseEvent) => evt.pageX - $(target).offset().left;
    let scrollElementWithEvent = (target: HTMLElement, evt: MouseEvent) =>
    {
        let distFromLeftEdge = lastMouseDown - offsetInElem(target, evt);
        $(target).scrollLeft(distFromLeftEdge);
    };
    let scrollElementWithEventIfMouseDown = (target: HTMLElement, evt: MouseEvent) => mouseDown ? scrollElementWithEvent(target, evt) : null;
    let startScroll = (target: HTMLElement, evt: MouseEvent) =>
    {
        mouseDown = true;
        lastMouseDown = offsetInElem(target, evt) + target.scrollLeft;
        lastMouseDownPageX = evt.pageX;
    };
    let endScroll = () =>
    {
        mouseDown = false;
    };
    let distanceSinceStart = (evt: MouseEvent) => Math.abs(evt.pageX - lastMouseDownPageX);

    $(document).ready(() =>
    {
        $(".products-ribbon-slide")
            .on("mousedown", evt => startScroll(evt.currentTarget, evt))
            .on("mousemove", evt => scrollElementWithEventIfMouseDown(evt.currentTarget, (evt.originalEvent as MouseEvent)));

        $(".products-ribbon-slide .product-tile")
            .on("mousedown", evt => evt.preventDefault())
            .on("click", evt =>
            {
                if(distanceSinceStart(evt) > 30) evt.preventDefault();
            });

        $(document).on("mouseup", endScroll);

        //TEMPORARY
        // $(".products-ribbon-slide .product-tile, .products-ribbon-slide .product-tile *").css("-webkit-user-select", "none").css("-webkit-user-drag", "none").attr("draggable", "false");
    });
}