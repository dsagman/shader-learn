// Author @patriciogv - 2015
// http://patriciogonzalezvivo.com

// #ifdef GL_ES
// precision mediump float;
// #endif

// uniform vec2 u_resolution;
// uniform vec2 u_mouse;
// uniform float u_time;

mat2 scale(vec2 _scale){
    return mat2(_scale.x,0.0,
                0.0,_scale.y);
}

mat2 rotate(float _angle){
    return mat2(cos(_angle),-sin(_angle),
                sin(_angle),cos(_angle));
}


void main(){

    float multiplier = mod(floor(float(iFrame/(10*60))), 1000.0) + 1.0;

    float complexity = multiplier*exp(multiplier/10.0);


    // vec2 uv = fract(fragCoord / iResolution.xy*(cos(iTime)*3.0+3.0));

    // Transform to center coordinates

    vec2 st = fract(gl_FragCoord.xy/iResolution.xy*1.0);
    // vec2 centeredST = 2.0 * st - 1.0;
    st.x *= iResolution.x / iResolution.y;
    st -= vec2(0.5);
    st *= rotate(iTime*.5);
    st = scale(vec2((iTime*.001)+1.0) ) * st;
    st += vec2(0.5);
    vec3 color = vec3(0.321,0.477,1.000);

    vec2 pos = vec2(0.5)-st;

    float r = length(pos)*2.0;
    float a = atan(pos.y,pos.x);

    float f = cos(floor(a*complexity*(sin(iTime*1.1)+1.1)))+.55;
    // f = abs(r*a);
    // f = abs(cos(a*3.));
    // f = abs(cos(a*2.5))*.5+.3;
    // f = abs(cos(a*12.)*sin(a*3.))*.8+.1;
    // f = smoothstep(-.5,1., cos(a*10.))*0.2+0.5;

    float c = 1.0-smoothstep(f,f+0.01,r);
    color = vec3( c*abs(sin(iTime)),c*abs(cos(iTime)), c);
    gl_FragColor = vec4(color, 1.0);
}