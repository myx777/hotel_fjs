#!/bin/bash

# Установите общее время таймера (в секундах)
sec_rem=30  # Например, 30 секунд

# Инициализация переменных
progress=0
total_time=$sec_rem
col=$(tput cols)
col=$((col - 10)) # Оставляем место для процентов

# Цикл таймера
while [ $sec_rem -gt 0 ]; do
    clear

    # Обновление оставшегося времени
    let sec_rem=sec_rem-1

    # Расчет прогресса
    progress=$((total_time - sec_rem))
    percent=$((progress * 100 / total_time))
    bar_length=$((col * percent / 100))
    
    # Генерация прогресс-бара
    bar=$(printf "%-${bar_length}s" "")
    bar="${bar// /=}>"
    echo "------------ please, wait before logs ----------------"
    echo -n "["
    printf "%s" "$bar"
    printf "%$((col - bar_length))s" ""
    echo "] $percent%"

    # Отображение оставшегося времени
    echo "Wait for: $sec_rem seconds"
    
    sleep 1
done