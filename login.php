<?php
require __DIR__.'/includes/bootstrap.php';
if(logged_in())redirect('index.php');
$error='';$notice='';
if(isset($_GET['expired']))$notice='La sesión finalizó por inactividad. Ingrese nuevamente para continuar.';
if($_SERVER['REQUEST_METHOD']==='POST'){
 verify_csrf();
 if(attempt_login(post('email'),post('password')))redirect('index.php');
 $error='No fue posible iniciar sesión. Verifique sus credenciales o espere si la cuenta fue bloqueada temporalmente.';
}
?>
<!doctype html>
<html lang="es">
<head>
 <meta charset="utf-8">
 <meta name="viewport" content="width=device-width,initial-scale=1">
 <meta name="theme-color" content="#123a63">
 <title>Acceso institucional | Bienestar Analytics</title>
 <link rel="icon" type="image/png" href="<?=url('assets/img/favicon.png')?>?v=<?=filemtime(__DIR__.'/assets/img/favicon.png')?>">
 <link rel="apple-touch-icon" href="<?=url('assets/img/favicon.png')?>">
 <link rel="stylesheet" href="<?=url('assets/css/app.css')?>?v=<?=filemtime(__DIR__.'/assets/css/app.css')?>">
 <link rel="stylesheet" href="<?=url('assets/css/v12.css')?>?v=<?=filemtime(__DIR__.'/assets/css/v12.css')?>">
</head>
<body class="institutional-login">
 <main class="login-shell">
  <section class="login-institution" aria-label="Presentación del sistema">
   <div class="login-institution-content">
    <div class="institution-badge"><img src="<?=url('assets/img/favicon.png')?>" alt="Identidad institucional"><div><strong>IESTP “Señor de Chocán”</strong><span>Unidad de Bienestar y Empleabilidad</span></div></div>
    <div class="login-copy"><span class="login-eyebrow">PLATAFORMA INSTITUCIONAL</span><h1>Bienestar Analytics</h1><p>Seguimiento, acompañamiento y análisis para una atención estudiantil organizada, oportuna y segura.</p></div>
    <div class="login-feature-grid"><article><i>01</i><div><strong>Seguimiento integral</strong><span>Expediente y atención centralizada</span></div></article><article><i>02</i><div><strong>Analítica de riesgos</strong><span>Indicadores para decisiones oportunas</span></div></article><article><i>03</i><div><strong>Acceso protegido</strong><span>Permisos definidos según cada rol</span></div></article></div>
   </div>
   <div class="login-institution-footer"><span>Bienestar estudiantil</span><span>Piura · 2026</span></div>
  </section>
  <section class="login-access">
   <div class="login-access-card">
    <div class="login-mobile-brand"><img src="<?=url('assets/img/favicon.png')?>" alt="Logo"><div><strong>Bienestar Analytics</strong><span>IESTP Señor de Chocán</span></div></div>
    <header><span class="login-eyebrow">ACCESO SEGURO</span><h2>Iniciar sesión</h2><p>Ingrese con las credenciales asignadas por el administrador.</p></header>
    <?php if($notice):?><div class="login-message login-message-info"><span>i</span><p><?=e($notice)?></p></div><?php endif;?>
    <?php if($error):?><div class="login-message login-message-error"><span>!</span><p><?=e($error)?></p></div><?php endif;?>
    <form method="post" class="professional-login-form" autocomplete="off">
     <?=csrf_field()?>
     <label><span>Correo institucional</span><div class="login-input"><i aria-hidden="true">@</i><input type="email" name="email" required autocomplete="username" placeholder="usuario@institucion.edu.pe" value="<?=e($_POST['email']??'')?>"></div></label>
     <label><span>Contraseña</span><div class="login-input password-wrap"><i aria-hidden="true">●</i><input id="password" type="password" name="password" required autocomplete="current-password" placeholder="Ingrese su contraseña"><button type="button" data-toggle-password aria-label="Mostrar u ocultar contraseña">Mostrar</button></div></label>
     <button class="btn login-submit" type="submit"><span>Ingresar al sistema</span><b aria-hidden="true">→</b></button>
    </form>
    <div class="login-security-note"><span>✓</span><p>Conexión protegida. El acceso y las operaciones realizadas quedan registrados por seguridad.</p></div>
    <footer>Uso exclusivo de personal autorizado</footer>
   </div>
  </section>
 </main>
 <script src="<?=url('assets/js/app.js')?>?v=<?=filemtime(__DIR__.'/assets/js/app.js')?>"></script>
</body>
</html>
