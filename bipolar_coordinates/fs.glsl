precision highp float;

varying vec2 vUV;
uniform vec2 FocalPoint;
uniform float SquareCount;
uniform vec2 Resolution;
uniform vec2 Position;
uniform float Scale;

vec3 checkerboard(vec2 uv)
{
    uv *= SquareCount;
    return vec3(mod(floor(uv).x + floor(uv).y, 2.0));
}

void main(void) {
    // Koordinaciu keitimas
    vec2 uv = (vUV-0.5)*2.0 * Resolution / Resolution.y;
    uv += Position / Resolution * 2.0;
    uv /= Scale;

    //Tau Skaiciavimas
    float t = log(distance(FocalPoint, uv) / distance(-FocalPoint, uv));

    vec2 v1 = FocalPoint - uv;
    vec2 v2 = -FocalPoint - uv;

    //Zenklas pries sigma
    float sgn = -sign( (uv.x - FocalPoint.x)*(-FocalPoint.y - FocalPoint.y) -
                    (uv.y - FocalPoint.y)*(-FocalPoint.x - FocalPoint.x) );

    // Sigma skaiciavimas
    float s = sgn*acos(dot(v1,v2)/(length(v1)*length(v2)));
    vec2 st = vec2(s, t);


    gl_FragColor = vec4(checkerboard(st), 1.0);
}