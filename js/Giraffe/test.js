var fix = function(active, sleep, v){
    var collideDirection = g.geom.Collision.checkDirection(active, sleep);
    if(collideDirection == g.geom.Collision.HORIZONTAL){
        if(active.getVelocity().y * (sleep.getPosition().getY() - active.getPosition().getY()) < 0){
            return;
        }
        v.x = -1 * v.x;
    }
    else {
        if(active.getVelocity().x * (sleep.getPosition().getX() - active.getPosition().getX()) < 0){
            return;
        }
        v.y = -1 * v.y;
    }
    active.dispatchEvent(g.events.ON_COLLIDE_SLEEP, {
        direction: collideDirection,
        velocity: v
    });
    active.setNextVelocity(v);
    active.setVelocity(v);
};