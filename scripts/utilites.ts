/**
 * Created by Michael on 07.06.2017.
 */

Number.prototype.clamp = (min: number, max: number) => Math.min(Math.max(this, max), min);