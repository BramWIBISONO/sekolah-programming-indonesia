$urls = @{
    "sd-kanisius-sengkan.png" = "https://yt3.googleusercontent.com/ytc/AIdro_nmWW_mvvfavg8r1BimjGDkyFnNwT4seHwc4yPnnbr4sQ=s900-c-k-c0x00ffffff-no-rj"
    "sd-kanisius-duwet.png" = "https://yt3.googleusercontent.com/ytc/AIdro_mMf0Y-6MfiTCi-I-ZQ45uBT45M-Dm41hnBviqonP7XsA=s900-c-k-c0x00ffffff-no-rj"
    "sd-kanisius-kalasan.png" = "https://sdkalasan.yayasankanisius.sch.id/assets/images/web/brand_1719538611.png"
    "smp-st-aloysius-turi.png" = "https://yt3.googleusercontent.com/ytc/AIdro_mkfo6cZpibgdGjGxhvLB1cQz-F1oyk9qZLXKAuDRX7XA=s900-c-k-c0x00ffffff-no-rj"
    "sekolah-kristen-kalam-kudus-surakarta.png" = "https://blogger.googleusercontent.com/img/b/R29vZ2xl/AVvXsEjqKR4JwB7GZcm8Hg_9h-jJmehqMuUxsOeJGB8PzNYy2vItGsJqn3ISR80tmJkj8ycgh8FQ9KQ8T6reT2lI_IZyR2LIdYvB0XI9bWp3m-7pglhBPm1E8-8QN1sMbXdEU5Dd3GGGUuPMwVMA/w640-rw/LOGO_BARU.png"
    "kidsland-international-school-surakarta.png" = "https://images.glints.com/unsafe/glints-dashboard.oss-ap-southeast-1.aliyuncs.com/company-logo/7d45f750af3c3c5f0d66cf24f9a3dcb3.png"
    "sekolah-nusantara-baru-surakarta.png" = "https://lookaside.fbsbx.com/lookaside/crawler/instagram/snb_solo/profile_pic.jpg"
    "nola-learning-center.png" = "https://nola.sch.id/wp-content/uploads/2020/11/nola-logo-headr-300x141.png"
    "ivy-school-surabaya.jpg" = "https://images.glints.com/unsafe/glints-dashboard.oss-ap-southeast-1.aliyuncs.com/company-logo/3e4dbcb290828a1ddfe9accb2f54ede9.jpg"
    "jac-school-surabaya.jpg" = "https://lookaside.fbsbx.com/lookaside/crawler/instagram/jacschool.official/profile_pic.jpg"
    "little-key-montessori-bekasi.jpg" = "https://lookaside.fbsbx.com/lookaside/crawler/instagram/littlekeyedu/profile_pic.jpg"
    "makedonia-christian-school.png" = "https://yt3.googleusercontent.com/ytc/AIdro_lTGj6ZrddXxX7i-lYDuB1DgfR57nuOXAzWzvspwLr4_A=s900-c-k-c0x00ffffff-no-rj"
    "oase-learning-center.jpg" = "https://lookaside.fbsbx.com/lookaside/crawler/instagram/oaselearningcenter/profile_pic.jpg"
    "imadeo-learning-center.png" = "https://lagoonavenuesungkono.id/images/product/PRODUCT__imadeo-learning-center__20250121093340.png"
    "icrea-imadeo-creative.jpg" = "https://lookaside.fbsbx.com/lookaside/crawler/instagram/imadeo.creative/profile_pic.jpg"
    "rumah-belajar-pancasila.png" = "https://play-lh.googleusercontent.com/kPS168JoX_wgAAETqYqNViNn68U3xwRUWolNtHGJpZUg_YsNufbDy7_1XrAjwbMEpQYUDW4SJIyY4oz_pGqtng"
    "inn-indonesia.png" = "https://innindonesia.com/wp-content/uploads/2020/09/Logo-INN-Indonesia.png"
}

$dir = "public\assets\partners\schools"

foreach ($file in $urls.Keys) {
    $url = $urls[$file]
    $out = Join-Path $dir $file
    try {
        Invoke-WebRequest -Uri $url -OutFile $out
        Write-Host "Downloaded: $file"
    } catch {
        Write-Host "Failed: $file - $($_.Exception.Message)"
    }
}
