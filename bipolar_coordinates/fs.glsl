precision highp float;
#extension GL_OES_standard_derivatives : enable
#define PI 3.1415926538
#define EPS 0.0000001

varying vec2 vUV;
uniform vec2 FocalPoint;
uniform vec2 FocalPoint2;
uniform float SquareCount;
uniform vec2 Resolution;
uniform vec2 Position;
uniform float Scale;


vec2 bipolar(vec2 uv, vec2 focalPoint)
{
    // - Tau Skaiciavimas

    float d1 = distance(focalPoint, uv);
    float d2 = distance(-focalPoint, uv);

    float t = log(d1 / d2);

    //Zenklas pries sigma
    float sgn = -sign( (uv.x - focalPoint.x)*(-focalPoint.y - focalPoint.y) -
                    (uv.y - focalPoint.y)*(-focalPoint.x - focalPoint.x) );

    // - Sigma skaiciavimas

    //Vektoriai tarp UV tasko ir zidiniu
    vec2 v1 = normalize(focalPoint - uv);
    vec2 v2 = normalize(-focalPoint - uv);

    //Cosinusas kampo tarp vektorių aprėžtas EPS tikslumu
    float cosAngle = dot(v1,v2);
    cosAngle = clamp(cosAngle, -1.0 + EPS, 1.0 - EPS);

    float s = sgn*acos(cosAngle);
    
    return vec2(s, t);
}

float checkerboardFn(vec2 uv)
{
    uv *= SquareCount;
    float u = fract(uv.x);
    float v = fract(uv.y);
    
    return u*(u-0.5)*(u-1.0)*v*(v-0.5)*(v-1.0);
}

vec3 checkerboard(vec2 uv, vec3 c1, vec3 c2)
{
    float f = checkerboardFn(uv);

    float grad = length(vec2(dFdx(f),dFdy(f)));
    float d = 0.8*grad;
    float edge = smoothstep(-d, d, f);

    return mix(c1, c2, edge);
}

vec3 gridLines(vec2 uv)
{
    uv *= SquareCount * 2.;

    vec2 grid = abs(fract(uv - 0.5) - 0.5) / fwidth(length(uv));
    return vec3(1.0 - clamp(min(grid.x, grid.y), 0., 1.));
}

void main(void) {
    // Koordinaciu keitimas
    vec2 uv = (vUV-0.5)*2.0 * Resolution / Resolution.y;
    uv += Position / Resolution * 2.0;
    uv /= Scale;

    vec2 st = bipolar(uv, FocalPoint);
    vec2 st2 = bipolar(uv, FocalPoint2);

    vec3 final = checkerboard(st, vec3(0.,0.5,0.3), vec3(1.,0.1,0.));
    vec3 final2 = checkerboard(st2, vec3(0.3), vec3(1.0));

    gl_FragColor = vec4(final * final2 + vec3(gridLines(st)), 1.0);
}