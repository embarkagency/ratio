const args = process.argv.slice(2);

function gcd (u, v) {
    if (u === v) return u;
    if (u === 0) return v;
    if (v === 0) return u;

    if (~u & 1)
        if (v & 1)
            return gcd(u >> 1, v);
        else
            return gcd(u >> 1, v >> 1) << 1;

    if (~v & 1) return gcd(u, v >> 1);

    if (u > v) return gcd((u - v) >> 1, v);

    return gcd((v - u) >> 1, u);
}

function ratio (w, h) {
	var d = gcd(w,h);
	return [w/d, h/d];
}

function ratio_str (n, d) {
    const pos = n - d >= 0 ? '+' : '';

    return `${d}${pos}${n - d}=${n}`;
}


const diff = args[2] ? parseInt(args[2]) : 5;

if(!Number.isNaN(args[0]) && !Number.isNaN(args[1])){

    const w = parseInt(args[0]);
    const h = parseInt(args[1]);

    let smallest = w+h;
    let smallestRatio = false;

    for(let i = w-diff; i <= w+diff; i++){
        for(let j = h-diff; j <= h+diff; j++){
            const [rw, rh] = ratio(i,j);
            if(rw + rh < smallest){
                smallest = rw + rh;
                smallestRatio = [`${ratio_str(i, w)}, ${ratio_str(j, h)}`, rw, rh];
            }
        }
    }

    console.log(smallestRatio);

} else {
    console.error('not valid numbers');
}
